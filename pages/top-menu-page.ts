import { expect, Locator, Page } from '@playwright/test';

export class TopMenuPage {
    readonly page: Page;
    readonly getStartedLink: Locator;
    readonly nodeLink: Locator;
    readonly javaLink: Locator;
    readonly nodeLabel: Locator;
    readonly javaLabel: Locator;
    readonly traceViewer: Locator;
    readonly search: Locator;
    readonly inputSearch: Locator;
    readonly nodeDescription: string = 'Installing Playwright';
    readonly javaDescription: string = `Playwright is distributed as a set of Maven modules. The easiest way to use it is to add one dependency to your project's pom.xml as described below. If you're not familiar with Maven please refer to its documentation.`;
    readonly traceViewerDescription = 'Playwright Trace Viewer is a GUI tool that lets you explore recorded Playwright traces of your tests meaning you can go back and forward through each action of your test and visually see what was happening during each action.'

    constructor(page: Page) {
        this.page = page;
        this.getStartedLink = page.getByRole('link', { name: 'Get started' });
        this.nodeLink = page.getByRole('button', {name: 'Node.js'});
        this.javaLink = page.getByRole('navigation', { name: 'Main' }).getByText('Java');
        this.nodeLabel = page.getByText(this.nodeDescription, {exact:true});
        this.javaLabel = page.getByText(this.javaDescription);
        this.traceViewer = page.getByText(this.traceViewerDescription);
        this.search = page.getByRole('button', { name: 'Search'});
        this.inputSearch = page.locator('#docsearch-input');
    }

    async hoverNode() {
        await this.nodeLink.hover();
    }
    
    async clickJava() {
        await this.javaLink.click();
    }

    async assertPageUrl(pageUrl: RegExp) {
        await expect(this.page).toHaveURL(pageUrl);
    }

    async assertNodeDescriptionNotVisible() {
        await expect(this.nodeLabel).not.toBeVisible();
    }

    async assertJavaDescriptionVisible() {
        await expect(this.javaLabel).toBeVisible();
    }

    async assertTraceViewer(){
        await expect(this.traceViewer).toBeVisible();
    }

    async openSearchDialog() {
        await this.search.click();
    }

    async typeSearch(text :string) {
        await this.inputSearch.type(text, { delay: 200 });
    }

}
export default TopMenuPage;