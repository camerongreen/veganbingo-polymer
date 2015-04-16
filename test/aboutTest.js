/**
 *
 *
 * User: Cameron Green <i@camerongreen.org>
 * Date: 16/04/15
 * Time: 5:23 PM
 */
suite('About page tests', function () {
  test('About page tests', function () {
    assert.isTrue(document.querySelector('#about::shadow h2').textContent === "&nbsp;About");
  });
});
