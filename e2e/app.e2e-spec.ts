import { Ng2VideoPage } from './app.po';

describe('ng2-video App', function() {
  let page: Ng2VideoPage;

  beforeEach(() => {
    page = new Ng2VideoPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
