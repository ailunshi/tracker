#from writing_streamlined import WritingSessionTracker
from .scrivx_parser import ScrivxParser
import os

def get_word_count(file_path):
    project_file = os.path.join(file_path, "Bel e Kyre.scrivx")
    data = os.path.join(file_path, "Files/Data")
    parser = ScrivxParser(data, project_file)
    parser.parse_scrivx_file()
    return parser.run() # returns the word count
