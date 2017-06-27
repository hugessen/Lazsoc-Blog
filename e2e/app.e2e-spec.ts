import { Hiring2Page } from './app.po';

describe('hiring2 App', () => {
  let page: Hiring2Page;

  beforeEach(() => {
    page = new Hiring2Page();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
