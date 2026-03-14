from playwright.sync_api import sync_playwright

def test_app_errors():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        errors = []
        page.on("pageerror", lambda err: errors.append(err))

        page.goto("http://localhost:8081/")
        page.wait_for_timeout(2000)

        for error in errors:
            print(f"Error caught: {error}")

        browser.close()

if __name__ == "__main__":
    test_app_errors()
