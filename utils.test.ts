import path from "path";
import { readLines } from "./utils";

const expectedResultLines = [
  "1abc2",
  "pqr3stu8vwx",
  "a1b2c3d4e5f",
  "treb7uchet",
];

describe("The file reader", () => {
  it("should parse the file and return an array of the contained lines", () => {
    const lines = readLines(path.join(__dirname, "input.test.txt"));
    expect(lines).toEqual(expectedResultLines);
  });
});
