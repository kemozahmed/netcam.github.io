from playwright.sync_api import sync_playwright

def test_app_errors():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        page.on("console", lambda msg: print(f"Console {msg.type}: {msg.text}"))
        page.on("pageerror", lambda err: print(f"Page Error: {err}"))
        page.on("requestfailed", lambda req: print(f"Request Failed: {req.url}"))

        page.goto("http://localhost:8081/")
        page.wait_for_timeout(3000)

        print("Page HTML:")
        print(page.content()[:500] + "...")

        browser.close()

if __name__ == "__main__":
    test_app_errors()
