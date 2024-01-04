#!/usr/bin/python3
""" Create LFUCache class that inherits from BaseCaching """
BaseCaching = __import__('base_caching').BaseCaching


class LFUCache(BaseCaching):
    """ LFUCache class inherits from BaseCaching.

    Attributes:
    - queue: List - represents the LFU queue
    - lfu: Dict - represents the LFU count for each key
    """

    def __init__(self):
        """ Initialize LFUCache """
        self.queue = []
        self.lfu = {}
        super().__init__()

    def put(self, key, item):
        """ Assign the item to the dictionary.

        Args:
        - key: Any - key for the item
        - item: Any - item to be cached

        Returns:
        - None
        """
        if key and item:
            if (len(self.queue) >= self.MAX_ITEMS and
                    not self.cache_data.get(key)):
                # Evict the least frequently used item
                delete = self.queue.pop(0)
                self.lfu.pop(delete)
                self.cache_data.pop(delete)
                print('DISCARD: {}'.format(delete))

            if self.cache_data.get(key):
                # Update LFU count for existing key
                self.queue.remove(key)
                self.lfu[key] += 1
            else:
                # Initialize LFU count for new key
                self.lfu[key] = 0

            # Find the position to insert the key in the LFU queue
            insert_index = 0
            while (insert_index < len(self.queue) and
                   not self.lfu[self.queue[insert_index]]):
                insert_index += 1
            self.queue.insert(insert_index, key)
            self.cache_data[key] = item

    def get(self, key):
        """ Return the value associated with the given key.

        Args:
        - key: Any - key to search for in the cache

        Returns:
        - Any: the cached item if found, None otherwise
        """
        if self.cache_data.get(key):
            # Update LFU count for the accessed key
            self.lfu[key] += 1
            # Rearrange the LFU queue based on updated counts
            if (self.queue.index(key) + 1 != len(self.queue)):
                while (self.queue.index(key) + 1 < len(self.queue) and
                       self.lfu[key] >=
                       self.lfu[self.queue[self.queue.index(key) + 1]]):
                    self.queue.insert(self.queue.index(key) + 1,
                                      self.queue.pop(self.queue.index(key)))
        return self.cache_data.get(key)
