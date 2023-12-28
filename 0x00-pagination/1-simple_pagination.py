#!/usr/bin/env python3
'''
Description: Implementing a method named get_page that takes two integer
arguments page with default value 1 and page_size with default value 10.
'''

import csv
from typing import List
from __simple_helper_function import index_range  # Corrected import


class Server:
    """Server class to paginate a database of popular baby names."""

    DATA_FILE = "Popular_Baby_Names.csv"  # File path for the dataset

    def __init__(self):
        ''' Initialize instance. '''
        self.__dataset = None  # Cached dataset attribute

    def dataset(self) -> List[List]:
        """Cached dataset retrieval method."""
        if self.__dataset is None:
            # Read the CSV file and store the dataset, excluding header
            with open(self.DATA_FILE) as f:
                reader = csv.reader(f)
                dataset = [row for row in reader]
            self.__dataset = dataset[1:]  # Exclude header row

        return self.__dataset  # Return the cached dataset

    def get_page(self, page: int = 1, page_size: int = 10) -> List[List]:
        ''' Output page of dataset. '''
        assert isinstance(page, int) and isinstance(page_size, int)
        assert page > 0 and page_size > 0

        # Calculate the start and end indices for the requested page
        start, end = index_range(page, page_size)

        try:
            return self.dataset()[start:end]  # Return the requested page
        except IndexError:
            return []  # Return an empty list if the page is out of range
