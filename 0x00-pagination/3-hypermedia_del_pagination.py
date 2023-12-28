#!/usr/bin/env python3
"""
Description: The goal here is that if between two queries, certain rows are
             removed from the dataset, the user does not miss items from
             dataset when changing page
"""

import csv
import math
from typing import List, Dict


class Server:
    """Server class to paginate a database of popular baby names.
    """
    DATA_FILE = "Popular_Baby_Names.csv"

    def __init__(self):
        '''Initialize instance.'''
        self.__dataset = None
        self.__indexed_dataset = None

    def dataset(self) -> List[List]:
        """Cached dataset.
        Loads the dataset from a CSV file if not already loaded and returns it.
        """
        if self.__dataset is None:
            with open(self.DATA_FILE) as f:
                reader = csv.reader(f)
                # Skip the header row
                dataset = [row for row in reader][1:]
            self.__dataset = dataset

        return self.__dataset

    def indexed_dataset(self) -> Dict[int, List]:
        """Dataset indexed by sorting position, starting at 0.
        """
        if self.__indexed_dataset is None:
            dataset = self.dataset()
            truncated_dataset = dataset[:1000]
            # Consider only the first 1000 rows
            self.__indexed_dataset = {
                i: dataset[i] for i in range(len(dataset))
            }
        return self.__indexed_dataset

    def get_hyper_index(self, index: int = None, page_size: int = 10) -> Dict:
        '''Return dict of pagination data.
        The returned dictionary contains
        key/value pairs for pagination details.
        - index: the start index of the page
        - next_index: the start index of the next page
        - page_size: the number of items on the page
        - data: the data in the page itself
        '''
        assert 0 <= index < len(self.dataset())

        indexed_dataset = self.indexed_dataset()
        indexed_page = {}

        i = index
        while (len(indexed_page) < page_size and i < len(self.dataset())):
            if i in indexed_dataset:
                indexed_page[i] = indexed_dataset[i]
            i += 1

        page = list(indexed_page.values())
        page_indices = indexed_page.keys()

        return {
            'index': index,
            'next_index': max(page_indices) + 1,
            'page_size': len(page),
            'data': page
        }
