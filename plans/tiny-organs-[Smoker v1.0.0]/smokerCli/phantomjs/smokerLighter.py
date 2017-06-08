
class lighter:

	# setter
	def setWindowSize(self, driver, width, height):
		driver.set_window_size(width, height)
		return driver

	def setText(self, driver, XPath, text):
		driver.find_element_by_xpath(XPath).send_keys(text)
		return driver

	# getter
	def getText(self, dirver, XPath, text):
		return driver

	def getAddress(self, driver):
		return driver.current_url()

	# events
	def doClick(self, driver, XPath):
		return driver

	def doWait(self, driver, time):
		# implicit wait
		driver.implicitly_wait(time)
		return driver

	# default: First open page
	def openPage(self, driver, url):
		driver.get(url)
		return driver