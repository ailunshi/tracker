import datetime, csv, os, time, json
from scrivx_parser import ScrivxParser

def str_time(time):
    # Returns datetime object as a string
    return time.strftime("%m/%d/%Y, %H:%M:%S")

def chop_ms(delta):
    # Returns timedelta object without microseconds
    return delta - datetime.timedelta(microseconds=delta.microseconds)

def serialize_datetime(obj): 
    if isinstance(obj, datetime.datetime): 
        return obj.isoformat() 
    raise TypeError("Type not serializable") 

def unserialize_datetime(date_string):
    try:
        return datetime.datetime.fromisoformat(date_string)
    except ValueError:
        raise TypeError("Date string not in ISO format")
    
def save_datefiles(data):
    with open("data.json", "w") as file:
        json.dump(data, file, default=serialize_datetime)

class WritingSessionTracker:
    def __init__(self, project, data, memory, data_json, writing_tracker, data_tracker, session_file):
        # Sets up a WritingSessionTracker object with sessions dictionary, tracker file, and data file
        
        self.sessions_jsonfile = memory
        self.data_jsonfile = data_json
        self.all_sessions = self.load_session(self.sessions_jsonfile)
        self.session = {}
        self.tracker = writing_tracker
        self.tracker_data = data_tracker
        self.all_data = self.load_session(self.data_jsonfile)
        self.data = data
        self.project_path = project
        self.session_dates = []
        self.session_number = self.load_session_number(session_file)
        self.session_file = session_file

        for count, sessions in self.all_sessions.items():
            start_timestamp = sessions["start_timestamp"]
            datetime_start_timestamp = unserialize_datetime(start_timestamp)
            start_date = datetime_start_timestamp.strftime("%m/%d/%Y")
            self.session_dates.append(start_date)

    def start_session(self):
        # Starts the session, initiates a ScrivxParser object, runs parser

        parser = ScrivxParser(self.data, self.project_path)
        parser.parse_scrivx_file()

        start_timestamp = datetime.datetime.now()
        print("Start time: " + str_time(start_timestamp))
        self.session["start_timestamp"] = start_timestamp
        self.session["date"] = start_timestamp.strftime("%m/%d/%Y")
        self.session["day"] = start_timestamp.strftime("%A")
        self.session["start_time"] = start_timestamp.strftime("%H:%M:%S")
        self.session["start_count"] = parser.run()
        
        return {"start_time": str_time(start_timestamp), "start_count": self.session["start_count"]}

    def end_session(self):
        # Ends session and calculates the data
        end_parser = ScrivxParser(self.data, self.project_path)
        end_parser.parse_scrivx_file()

        end_timestamp = datetime.datetime.now()
        self.session["end_timestamp"] = end_timestamp
        self.session["end_time"] = end_timestamp.strftime("%H:%M:%S")
        self.session["end_count"] = end_parser.run()
        self.session["words"] = self.session["end_count"] - self.session["start_count"]
        self.session["elapsed_time_str"] = str(chop_ms(self.session["end_timestamp"] - self.session["start_timestamp"]))
        self.session["elapsed_time_sec"] = int(chop_ms(self.session["end_timestamp"] - self.session["start_timestamp"]).total_seconds())

        return {"end_time": str_time(end_timestamp), "end_count": self.session["end_count"]}

    def write_to_raw_file(self):
        # Writes all the pertinent data into a CSV file

        with open(self.tracker, "a", newline='') as csvfile:
            writer = csv.writer(csvfile)
            writer.writerow([self.session["date"], self.session["day"], self.session["start_time"], self.session["end_time"], self.session["elapsed_time_str"], 
                             self.session["start_count"], self.session["end_count"], self.session["words"]])

    def write_to_data_file(self):
        # Compiles more useful data based on information from the CSV file

        # Initialize data for the session date if it doesn't exist
        session_date = self.session["date"]
        if session_date not in self.session_dates:

            self.all_data[session_date] = {
                "average_rate": self.session["words"] / (self.session["elapsed_time_sec"] / 3600) if self.session["elapsed_time_sec"] > 0 else 0,
                "total_words": self.session["words"],
                "total_time": self.session["elapsed_time_sec"] / 60, #in minutes
                "total_sessions": 1,
                "average_words_per_session": self.session["words"],
                "average_time_per_session": self.session["elapsed_time_sec"] / 60 #in minutes
            }
            
        else:
            self.all_data[session_date]["average_rate"] = (self.all_data[session_date]["total_words"] + self.session["words"]) / ((self.all_data[session_date]["total_time"] + (self.session["elapsed_time_sec"] / 60)) / 60)
            self.all_data[session_date]["total_words"] += self.session["words"]
            self.all_data[session_date]["total_time"] += self.session["elapsed_time_sec"] / 60 #in minutes
            self.all_data[session_date]["total_sessions"] += 1
            self.all_data[session_date]["average_words_per_session"] = self.all_data[session_date]["total_words"] / self.all_data[session_date]["total_sessions"]
            self.all_data[session_date]["average_time_per_session"] = self.all_data[session_date]["total_time"] / self.all_data[session_date]["total_sessions"] #in minutes

        # Write the calculated data to data.csv
        with open(self.tracker_data, "w", newline='') as datafile:
            writer = csv.writer(datafile)
            writer.writerow(["Date", "Average Rate", "Total Words", "Total Time (min)", "Total Sessions", 
                             "Average Words Per Session", "Average Time Per Session (min)"])
            
            for date, stats in self.all_data.items():
                writer.writerow([
                    date,
                    stats["average_rate"],
                    stats["total_words"],
                    stats["total_time"],
                    stats["total_sessions"],
                    stats["average_words_per_session"],
                    stats["average_time_per_session"]
                ])

        #need to save data to memory
        self.save_session(self.all_data, self.data_jsonfile)
  
    def load_session(self, file):
        # Loads all sessions for this project from a JSON file

        if os.path.exists(file):
            with open(file, 'r') as f:
                return json.loads(f.read())
        else:
            return {}

    def save_session(self, file, jsonfile):
        # Saves current writing session to a JSON file

        with open(jsonfile, "w") as f:
            json.dump(file, f, default=serialize_datetime)

    def load_session_number(self, file):
        # Loads the session number from a file

        if os.path.exists(file):
            with open(file, "r") as f:
                return int(f.read())
        else:
            with open(file, "w") as f:
                f.write(str(1))
                return 1
    
    def save_session_number(self, file, session_number):
        # Saves the session number to a file

        with open(file, "w") as f:
            f.write(str(session_number))