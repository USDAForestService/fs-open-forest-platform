export class MockMarked {
  public text(text) {
    return text;
  }
}

export class MockMarkdownService {
  public renderer() {
    return new MockMarked;
  }
}
