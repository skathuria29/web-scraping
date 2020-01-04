const cheerio = require('cheerio');

const getTableData = html  => {
    const data = [];
    const $ = cheerio.load(html);
    const $tr = $(html).find('tr');

    $tr.each((i, tr) => {
        if( i === 0)
            return;
        const $tds = $(tr).find('td');
        data.push({
            'date': $tds.eq(0).text().trim() || '',
            'event': $tds.eq(1).find('a').text().trim() || '',
            'eventLink': $tds.eq(1).find('a').attr('href'),
            'place': $tds.eq(2).text(),
            'categories': $tds.eq(3).text().trim().split(" "),
            'dateCrawled': new Date()
        });
    });

    return data;
}   

module.exports.scrapeData = html => {
    let data = [];
    const $ = cheerio.load(html);
    const $tables = $('#505225731429494631 table');

    $tables.each((i, elem) => {
        if($(elem).find("[data-google-query-id]").length === 0) {
            data = data.concat(getTableData(elem));
        }
    });

   return data;
};