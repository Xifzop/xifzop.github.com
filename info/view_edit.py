import json

CONFIG_FILE = 'config.json'

class Formatter(object):

	TAB  = "   " 

	def __init__(self):
		self.tab_count = 0

	def format(self, lst):
	
		if type(lst) == list:
			map(self.format, lst)
		elif type(lst) == dict:
			map(self.format, lst.items())
		elif type(lst) == tuple:
			self.tab_count += 1
			print self.TAB * self.tab_count ,lst[0], ':', self.format(lst[1])
			self.tab_count -= 1
		else:
			return lst

		return ""

with open(CONFIG_FILE, 'r') as config:
	config_elements = json.loads(config.read())
	Formatter().format(config_elements)