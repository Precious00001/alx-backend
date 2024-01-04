#!/usr/bin/env python3
"""Most Recently Used caching module."""
from collections import OrderedDict
from base_caching import BaseCaching


class MRUCache(BaseCaching):
    """Represents an object that allows storing and
    retrieving items from a dictionary with an MRU
    removal mechanism when the limit is reached.
    Inherits from BaseCaching class.
    """
    def __init__(self):
        """Initializes the MRU cache with an ordered dictionary.
        """
        super().__init__()
        self.cache_data = OrderedDict()

    def put(self, key, item):
        """Adds an item to the MRU cache.

        Args:
        - key: Any - key for the item
        - item: Any - item to be cached

        Returns:
        - None
        """
        if key is None or item is None:
            return

        # If key is not in cache, check if limit reached and remove MRU item
        if key not in self.cache_data:
            if len(self.cache_data) + 1 > BaseCaching.MAX_ITEMS:
                mru_key, _ = self.cache_data.popitem(last=False)
                print("DISCARD:", mru_key)

            # Add the new item and move it to the front (MRU position)
            self.cache_data[key] = item
            self.cache_data.move_to_end(key, last=False)
        else:
            # Update existing item and move it to the front (MRU position)
            self.cache_data[key] = item

    def get(self, key):
        """Retrieves an item from the MRU cache by key.

        Args:
        - key: Any - key to search for in the MRU cache

        Returns:
        - Any: the cached item if found, None otherwise
        """
        if key is not None and key in self.cache_data:
            # Move the accessed item to the front (MRU position)
            self.cache_data.move_to_end(key, last=False)
        return self.cache_data.get(key, None)
