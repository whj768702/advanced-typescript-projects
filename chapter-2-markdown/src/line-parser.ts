class LinerParser {
  Parse(value: string, tag: string): [boolean, string] {
    let output: [boolean, string] = [false, value];
    if (value === '') {
      return output;
    }
    let split = value.startsWith(`${tag}`);
    if (split) {
      output[0] = true;
      output[1] = value.substring(tag.length);
    }
    return output;
  }
}

class ParseElement {
  CurrentLine: string = '';
}

export { ParseElement, LinerParser };
