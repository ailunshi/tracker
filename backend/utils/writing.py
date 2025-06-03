#from writing_streamlined import WritingSessionTracker
from .scrivx_parser import ScrivxParser
import os

class Writing:
    def __init__(self, project):
        self.project = project
        self.project_file = "/Users/balloon/short stories/stories.scriv/stories.scrivx"
        self.data = "/Users/balloon/short stories/stories.scriv/Files/Data"
        self.memory = "sessions_stories.json"
        self.data_json = "data_stories.json"
        self.writing_tracker = "writingtracker_stories.csv"
        self.data_tracker = "data_stories.csv"
        self.session_file = "session_stories.txt"
            
    """def call_writing_streamlined(self):
        new_session = WritingSessionTracker(self.project_file, self.data, self.memory, self.data_json, self.writing_tracker, self.data_tracker, self.session_file)
        new_session.start_session()"""

    """def start_session():
        writing_instance = Writing("short stories")
        writing_instance.call_writing_streamlined()"""

def get_word_count(file_path):
    project_file = os.path.join(file_path, "Bel e Kyre.scrivx")
    data = os.path.join(file_path, "Files/Data")
    parser = ScrivxParser(data, project_file)
    parser.parse_scrivx_file()
    return parser.run() # returns the word count

"""
if __name__ == "__main__":
    project = "short stories"
    writing_instance = Writing(project)
    writing_instance.call_writing_streamlined()
    """