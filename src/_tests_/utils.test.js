const { dateFormatter } = require("../utils/utils");

describe("dateFormatter()", () => {
  test("returns 'Invalid Date' string if an empty string passed", () => {
    expect(dateFormatter("")).toBe("Invalid Date");
  });

  test("returns 'Invalid Date' string if an invalid date string passed", () => {
    expect(dateFormatter("not a date")).toBe("Invalid Date");
  });

  test("returns formatted date without timezone when JS date passed", () => {
    expect(dateFormatter("2018-05-27T03:32:28.514Z")).toBe(
      "27/05/2018, 04:32:28"
    );
  });
});
