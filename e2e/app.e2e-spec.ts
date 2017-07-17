import { Ng2VideoPage } from './app.po';

describe('ng2-video App', () => {
  let page: Ng2VideoPage;

  beforeEach(() => {
    page = new Ng2VideoPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
