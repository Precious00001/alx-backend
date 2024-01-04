#!/usr/bin/python3
"""Create FIFOCache class that inherits from BaseCaching"""
from base_caching import BaseCaching


class FIFOCache(BaseCaching):
    """A First-In-First-Out (FIFO) caching implementation
    that inherits from the BaseCaching class.
    """

    def __init__(self):
        """Initialize FIFOCache."""
        self.queue = []  # Keeps track of the order of keys in the cache
        super().__init__()

    def put(self, key, item):
        """Assign the item to the dictionary.

        Args:
        - key: Any - key for the item
        - item: Any - item to be cached

        Returns:
        - None
        """
        if key and item:
            if self.cache_data.get(key):
                self.queue.remove(key)
            self.queue.append(key)
            self.cache_data[key] = item
            if len(self.queue) > self.MAX_ITEMS:
                # If cache exceeds the limit, remove the oldest item
                deleted_key = self.queue.pop(0)
                self.cache_data.pop(deleted_key)
                print('DISCARD: {}'.format(deleted_key))

    def get(self, key):
        """Output the value associated with the given key.

        Args:
        - key: Any - key to search for in the cache

        Returns:
        - Any: the cached item if found, None otherwise
        """
        return self.cache_data.get(key)
