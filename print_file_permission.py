import os
import stat
import sys

filepath = sys.argv[1]
print('filepath: {}'.format(filepath) + "\n");

# joinedPath = os.path.join(filepath)

st = os.stat(filepath)
oct_perm = oct(st.st_mode)
print(oct_perm)

