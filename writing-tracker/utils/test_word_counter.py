from word_counter import word_count
import unittest

class TestWordCounter(unittest.TestCase):

    def test_em_dashes(self):
        t1 = "cursed—blessed—to"
        t2 = """she said, “wait, my name—“"""
        t3 = "—wait a second"
        t4 = "word?—word"
        t5 = """A corset? A camisole? Or—"""
        t6 = "For— the interview."
        paragraph = """he was now inexplicably looking upon a most arresting visage—one that, to his confused mind, looked not unlike an angel.
The angel said something that he did not understand."""

        self.assertEqual(word_count(t1), 3)
        self.assertEqual(word_count(t2), 5)
        self.assertEqual(word_count(t3), 3)
        self.assertEqual(word_count(t4), 2)
        self.assertEqual(word_count(paragraph), 30)
        self.assertEqual(word_count(t5), 5)
        self.assertEqual(word_count(t6), 3)

    def test_ellipses(self):
        t1 = "Wow..."
        t2 = "And... you wanted to do that?"
        t3 = "Are we... sure that she leaked voxie?"

        self.assertEqual(word_count(t1), 1)
        self.assertEqual(word_count(t2), 6)
        self.assertEqual(word_count(t3), 7)

    def test_punctuation_and_dialogue(self):
        t0 = "So you're saying that's it?"
        t1 = "They're going to the store"
        t2 = "They've been trying hard"
        t3 = "I couldn't've done it yet."
        t4 = """“So you’re the man I hear who married a Gor,”"""

        self.assertEqual(word_count(t0), 5)
        self.assertEqual(word_count(t1), 5)
        self.assertEqual(word_count(t2), 4)
        self.assertEqual(word_count(t3), 5)
        self.assertEqual(word_count(t4), 10)

    def test_numbers(self):
        t1 = "The only words on it were written in white ink—Carousel, 112."

        self.assertEqual(word_count(t1), 12)

    def test_hyphens(self):
        t1 = "I'm a well-known author"

        self.assertEqual(word_count(t1), 4)


    
if __name__ == "__main__":
    unittest.main()

