# Using hash table to improving the speed of searching by name and grouping by ts

class Item():
    def __init__(self, key, value):
        self.key = key
        self.value = value

class HashTable:
    def __init__(self, size):
        self.size = size
        self.table = [[] for _ in range(self.size)]

    def _hash_function(self, key):
        return key % self.size

    # set
    def set(self, key, value):
        hash_index = self._hash_function(key)

        for item in self.table[hash_index]:
            if item.key == key:
                item.value = value

        self.table[hash_index].append(Item(key, value))

    def get(self, key, value):
        hash_index = self._hash_function(key)

        for item in self.table[hash_index]:
            if item.key == key:
                return item.value

    def traverse(self):
        for items in self.table:
            for item in items:
                print(f"{item.key}: {item.value}")
    # get

    # remove

hashTable = HashTable(10)
hashTable.set(1, 1)
hashTable.set(2, 2)
hashTable.set(3, 3)
hashTable.set(4, 4)
hashTable.set(11, 2)
hashTable.set(2, 3)

hashTable.traverse()