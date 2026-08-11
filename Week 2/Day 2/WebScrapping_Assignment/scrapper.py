import os
from io import StringIO

import pandas as pd

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC


URL = "https://docs.cyberark.com/pam-self-hosted/10.10/en/content/pas%20inst/endoflifepolicy.htm"


driver = webdriver.Chrome()

wait = WebDriverWait(driver, 20)

driver.get(URL)

wait.until(
    EC.presence_of_element_located(
        (By.ID, "SunsetTimelinesEndpointPrivilegeManagerServer")
    )
)

os.makedirs("output", exist_ok=True)

output_file = "output/CyberArk_Tables.csv"

# IDs of the required sections
section_ids = [
    "SunsetTimelinesPrivilegedAccessSecurity",
    "SunsetTimelinesPrivilegedThreatAnalytics",
    "SunsetTimelinesEndpointPrivilegeManagerServer"
]

with open(output_file, "w", encoding="utf-8", newline="") as f:

    for i, section_id in enumerate(section_ids, start=1):

        heading = driver.find_element(By.ID, section_id)

        title = heading.text

        table = heading.find_element(
            By.XPATH,
            "following-sibling::table[1]"
        )

        html = table.get_attribute("outerHTML")

        df = pd.read_html(StringIO(html))[0]

        print(f"\nTable {i}")
        print(title)
        print(df.head())

        # Write title
        f.write(title + "\n")

        # Write table
        df.to_csv(f, index=False)

        # Leave 3 blank lines
        f.write("\n\n\n")

driver.quit()

print("\nDone!")
print(f"Output saved to {output_file}")