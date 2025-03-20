import { test, type Page } from '@playwright/test';
import { HomePage } from '../pages/home-page';
import { TopMenuPage } from '../pages/top-menu-page';

const URL = 'https://playwright.dev/';
let homePage: HomePage;
let topMenuPage: TopMenuPage;
const pageUrl = /.*intro/;

test.beforeEach(async ({page}) => {
    await page.goto(URL);
    homePage = new HomePage(page);
    topMenuPage = new TopMenuPage(page);
});

test.describe('Playwright website', () => {

    test('has title', async () => {
        await homePage.assertPageTitle();
    });
    
    test('get started link', async () => {
        // Act
        await homePage.clickGetStarted();
        // Assert
        await topMenuPage.assertPageUrl(pageUrl);
    });
    
    test('check Java page', async () => {
        await test.step('Act', async () => {
            await homePage.clickGetStarted();
            await topMenuPage.hoverNode();
            await topMenuPage.clickJava();
        });
      
        await test.step('Assert', async () => {
            await topMenuPage.assertPageUrl(pageUrl);
            await topMenuPage.assertNodeDescriptionNotVisible();
            await topMenuPage.assertJavaDescriptionVisible();
        });
    });  

    test('search a term', async () => {
        await homePage.clickGetStarted();
        await topMenuPage.assertPageUrl(pageUrl);
        await topMenuPage.openSearchDialog();
    })
});