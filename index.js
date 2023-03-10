const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
//   const userAgent = () => {
//     const userAgentsList = ['Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.84 Safari/537.36', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36', 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2919.83 Safari/537.36', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2866.71 Safari/537.36', 'Mozilla/5.0 (X11; Ubuntu; Linux i686 on x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2820.59 Safari/537.36', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2762.73 Safari/537.36', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2656.18 Safari/537.36', 'Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.36 (KHTML like Gecko) Chrome/44.0.2403.155 Safari/537.36', 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2227.1 Safari/537.36', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2227.0 Safari/537.36', 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2227.0 Safari/537.36', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2226.0 Safari/537.36', 'Mozilla/5.0 (Windows NT 6.4; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2225.0 Safari/537.36', 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2225.0 Safari/537.36', 'Mozilla/5.0 (Windows NT 5.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2224.3 Safari/537.36']
//     return (userAgentsList[Math.floor(Math.random() * (userAgentsList.length - 0) + 0)]) 
//   }

//   await page.setUserAgent(userAgent().toString())
  await page.goto('https://ais.usvisa-info.com/es-ar/niv/users/sign_in')
  
  // Set email and password
  await page.waitForSelector('input.email')
  await page.waitForSelector('input.password')
    await page.evaluate(() => {
        document.querySelector('input.email').value = 'lukabrizzi@gmail.com'
        document.querySelector('input.password').value = 'milenio9976'
        document.querySelector('.icheckbox').click()
        document.querySelector('[name="commit"]').click()
    })
    
    // Click in continue button
    await page.waitForSelector('[role="menuitem"] a.button')
    await page.evaluate(() => {
        document.querySelector('[role="menuitem"] a.button').click()
    })
    
    await page.waitForSelector('#forms li:nth-child(4) .accordion-content p a')
    // Click in re-program turn
    await page.evaluate(() => {
        document.querySelector('#forms li:nth-child(4) .accordion-content p a').click()
    })
    
    await page.waitForSelector('#appointments_consulate_appointment_date')
    await page.evaluate(() => {
        document.querySelector('#appointments_consulate_appointment_date').click()
    })
    
    await page.waitForSelector('.ui-datepicker-next')
    // await page.click('#appointments_consulate_appointment_time')
    const hasNewTurn = await page.evaluate(() => {
        do {
            document.querySelector('.ui-datepicker-next').click()
        } while (!document.querySelector('[data-handler="selectDay"][data-event="click"]'))
        const month = document.querySelector('[data-handler="selectDay"][data-event="click"]').dataset.month
        const year = document.querySelector('[data-handler="selectDay"][data-event="click"]').dataset.year

        const today = new Date()
        const currentMonth = String(today.getMonth() + 1).padStart(2, '0')
        const currentYear = today.getFullYear();
        // if (Number(year) === Number(currentYear)) {
        //     if (Number(month) - Number(currentMonth) <= 2 ) {
                document.querySelector('[data-handler="selectDay"][data-event="click"]').click()
                return `${month}-${year}`
                // if (document.querySelector('#appointments_consulate_appointment_time option:nth-child(2)')) {
                //     document.querySelector('#appointments_consulate_appointment_time option:nth-child(2)').click()
                // }

                // do {
                //     document.querySelector('.ui-datepicker-multi-2 .ui-datepicker-next').click()
                // } while (!document.querySelector('.ui-datepicker-multi-2 [data-handler="selectDay"][data-event="click"]'))
                // document.querySelector('.ui-datepicker-multi-2 [data-handler="selectDay"][data-event="click"]').click()
                // return true
        //     }
        // }
        // return false
    })
    console.log(hasNewTurn);

    await page.goto(`https://ais.usvisa-info.com/es-ar/niv/schedule/38271507/appointment/times/29.json?date=&consulate_id=28&consulate_date=2023-09-08&consulate_time=08:00&appointments[expedite]=false`)
    
    await page.waitForTimeout(999999)
    // if (hasNewTurn) {
    //     console.log('Encontro turno!!')
    // } else {
    //     console.log('No encontro turno :(')
    // }

    await browser.close();

})();