#!/usr/bin/env python3
"""Pagination helper function.
"""

from typing import Tuple


def index_range(page: int, page_size: int) -> Tuple[int, int]:
    """Retrieves the index range for a given page and page size.

    Args:
        page (int): The current page number.
        page_size (int): The number of items per page.

    Returns:
        Tuple[int, int]: A tuple representing the start and
        end indices for the given page.
    """
    # Calculate the start index based on the given page and page size
    start = (page - 1) * page_size
    # Calculate the end index by adding the page size to the start index
    end = start + page_size
    # Return a tuple containing the start and end indices
    return (start, end)
