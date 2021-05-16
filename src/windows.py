import os
import glob

install_path = os.path.dirname(os.path.realpath(__file__))

local_dir = os.environ['LOCALAPPDATA']
app_dirs = list(glob.glob(local_dir + '\Discord\\app-*'))

os.system('start ' + app_dirs[-1]+ '\Discord.exe --remote-debugging-port=31337')
os.system('start node ' + install_path + '\index.js')
