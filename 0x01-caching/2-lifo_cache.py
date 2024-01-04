#!/usr/bin/env python3
"""Last-In First-Out caching module."""

from collections import OrderedDict
from base_caching import BaseCaching


class LIFOCache(BaseCaching):
    """Represents an object that allows storing and
    retrieving items from a dictionary with a Last-In,
    First-Out (LIFO) removal mechanism when the limit
    is reached.
    Inherits from BaseCaching class.
    """
    def __init__(self):
        """Initializes the LIFO cache.

        Overrides the initialization of the base class
        to use an OrderedDict for efficient LIFO removal.
        """
        super().__init__()
        self.cache_data = OrderedDict()

    def put(self, key, item):
        """Adds an item to the LIFO cache.

        Args:
        - key: Any - key for the item
        - item: Any - item to be cached

        Returns:
        - None
        """
        if key is None or item is None:
            return
        if key not in self.cache_data:
            if len(self.cache_data) + 1 > BaseCaching.MAX_ITEMS:
                # If the cache limit is reached, remove the
                # last item (oldest) from the cache.
                last_key, _ = self.cache_data.popitem(last=True)
                print("DISCARD:", last_key)
        self.cache_data[key] = item
        # Move the newly added item to the end (most recent)
        self.cache_data.move_to_end(key, last=True)

    def get(self, key):
        """Retrieves an item by key.

        Args:
        - key: Any - key to search for in the LIFO cache

        Returns:
        - Any: the cached item if found, None otherwise
        """
        return self.cache_data.get(key, None)
