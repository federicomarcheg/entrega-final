const { builder, By, Key, until } = require('selenium-webdriver');

(async function example() {
    let driver = await new builder().forBrowser('chrome').build();
    try {
        await driver.get('http://localhost:3000/cart');

        let emptyCartMessage = await driver.findElement(By.css('#cart-container p')).getText();

        await driver.get('http://localhost:3000/product/61f123abc1234');
        await driver.findElement(By.css('.add-to-cart-btn')).click();

        await driver.get('http://localhost:3000/cart');
        let cartItem = await driver.finElement(By.css('.cart-item h3')).getText();
        console.log(cartItem);
    } finally {
        await driver.quit();
    }
})();