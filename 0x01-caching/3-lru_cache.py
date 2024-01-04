#!/usr/bin/python3
"""Create LRUCache class that inherits from BaseCaching"""
from base_caching import BaseCaching


class LRUCache(BaseCaching):
    """Define LRUCache class that inherits from BaseCaching.

    Attributes:
    - queue (list): Represents the order of keys
    based on their recent access.
    """

    def __init__(self):
        """Initialize LRUCache.

        Initializes the LRUCache instance with an empty queue.
        """
        self.queue = []
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
                # Remove the least recently used item
                delete = self.queue.pop(0)
                self.cache_data.pop(delete)
                print('DISCARD: {}'.format(delete))

    def get(self, key):
        """Return the value associated with the given key.

        Args:
        - key: Any - key to search for in the cache

        Returns:
        - Any: the cached item if found, None otherwise
        """
        if self.cache_data.get(key):
            # Update the queue to reflect recent access
            self.queue.remove(key)
            self.queue.append(key)
        return self.cache_data.get(key)
