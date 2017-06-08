
import time
import unittest
from selenium import webdriver
from selenium.webdriver.common.keys import Keys

from smokerLighter import lighter

# ref: http://selenium-python.readthedocs.io/api.html
class PythonOrgSearch(unittest.TestCase):

    def setUp(self):
        # PhantomJs (headless) webdriver
        self.driver = webdriver.Chrome("../drivers/chromedriver.exe")


    def test_search_in_python_org(self):

        driver = self.driver
        url = "http://46.21.110.28/auth/#/"

        # Trick the webdriver that it has an open window
        driver = lighter().setWindowSize(driver, 1124, 850)

        driver = lighter().openPage(driver, url)
        driver = lighter().doWait(driver, 10)
        driver = lighter().setText(driver, "//input[@type='email']", "uanvillegas@gmail.com");
        driver = lighter().setText(driver, "//input[@type='password']", "Abcd1234");
        
        driver.find_element_by_css_selector("span.ng-binding").click()
        driver.implicitly_wait(10)
        # time.sleep(15)
        driver.find_element_by_css_selector("div[name=\"name\"]").click()
        print(driver.current_url)

    def tearDown(self):
        self.driver.close()

if __name__ == "__main__":
    unittest.main()