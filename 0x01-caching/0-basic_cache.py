#!/usr/bin/env python3
"""Basic caching module."""

from base_caching import BaseCaching


class BasicCache(BaseCaching):
    """Represents an object that allows storing and
    retrieving items from a dictionary.
    Inherits from BaseCaching class.
    """
    def put(self, key, item):
        """Adds an item to the cache.

        Args:
        - key: Any - key for the item
        - item: Any - item to be cached

        Returns:
        - None
        """
        if key is None or item is None:
            return
        self.cache_data[key] = item

    def get(self, key):
        """Retrieves an item by key.

        Args:
        - key: Any - key to search for in the cache

        Returns:
        - Any: the cached item if found, None otherwise
        """
        return self.cache_data.get(key, None)
