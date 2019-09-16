interface LineType {
  type: 'title' | 'text';
  content: string;
}

export class ConsoleBox {
  private lines: LineType[];
  private width: number;

  constructor(content?: string) {
    this.lines = [];
    this.width = 0;

    if (content) {
      this.text(content);
    }
  }

  title(title: string) {
    this.lines.push({
      type: 'title',
      content: title
    });
  }

  text(text: string) {
    this.lines.push({
      type: 'text',
      content: text
    });
  }

  private createLine(content?: string, padding: number = 0, end: boolean = false) {
    let output = ``;

    if (content === undefined) {
      if (end) {
        output += `╚`;
      } else {
        output += `╔`;
      }

      for (let i = 0; i < this.width - 2; i++) {
        output += `═`;
      }

      if (end) {
        output += `╝`;
      } else {
        output += `╗`;
      }
    } else if (content == '') {
      output += `║`;

      for (let i = 0; i < this.width - 2; i++) {
        output += ` `;
      }

      output += `║`;
    } else {
      output += `║`;

      for (let i = 0; i < padding; i++) {
        output += ` `;
      }

      output += content;

      for (let i = output.length; i < this.width - 1; i++) {
        output += ` `;
      }

      output += `║`;
    }

    output += "\n";

    return output;
  }

  output(print: boolean = false): string {
    let hasTitle = false;

    this.lines.forEach(line => {
      let len = line.content.length + 2;
      len += 2;

      if (line.type == 'title') {
        hasTitle = true;
      } else if (hasTitle) {
        len += 2;
      }

      if (len > this.width) {
        this.width = len;
      }
    });

    let output = this.createLine();
    hasTitle = false;

    this.lines.forEach((line, i) => {
      if (line.type == 'title') {
        hasTitle = true;

        if (i > 0) {
          output += this.createLine('');
        }

        output += this.createLine(line.content, 1);
      } else {
        output += this.createLine(line.content, hasTitle ? 3 : 1);
      }
    });

    output += this.createLine(undefined, 0, true);

    if (print) {
      console.log(output);
    }

    return output;
  }
}