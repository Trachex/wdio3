describe("Google cloud suite", () => {

    it("Should calculate the price", async () => {
        await browser.url("https://cloud.google.com/");

        // Performing a search
        const search = await $('div[jsname="Ohx1pb"]');
        search.click();
        const input = await $('input#i4');
        await input.setValue('Google Cloud Platform Pricing Calculator');
        const searchBtn = await $('i[jsname="Z5wyCf"]');
        searchBtn.click();

        // Going to Calculator page
        const link = await $('a[track-name="google cloud pricing calculator"]');
        link.click();

        // Starting calculator
        const addEstimate = await $('div[jsname="Olpjye"] button[data-idom-class="VVEJ3d"]');
        addEstimate.click();
        const compEngine = await $('div.DzHYNd div:nth-child(1)');
        compEngine.click();

        // Filling the form
        const instanceNum = await $('#c11');
        instanceNum.click();
        await instanceNum.setValue(4);

        const machineType = await $('div[jsname="kgDJk"] div[jsname="oYxtQd"]');
        machineType.click();
        const machineOpt = await $('li[data-value="n1-standard-8"]');
        machineOpt.click();

        const ssd = await $('div[data-field-type="180"] div.VfPpkd-TkwUic');
        ssd.click();
        const ssdOpt = await $('ul[aria-label="Local SSD"] li[data-value="2"]');
        ssdOpt.click();
        
        const region = await $('div[data-field-type="115"] div.VfPpkd-TkwUic');
        region.click();
        // Choosing Netherland (europe-west4), no Frankfurt option for V100
        const regionOpt = await $('li[data-value="europe-west4"]');
        regionOpt.click();

        const commitUsage = await $('div[data-field-type="116"] div[jsname="U7okFc"] div:nth-child(2)');
        commitUsage.click();

        const addGPU = await $('div[data-field-type="114"] span.eBlXUe-hywKDc');
        addGPU.click();
        const GPUModel = await $('div[data-field-type="158"] div.VfPpkd-TkwUic');
        GPUModel.click();
        const GPUOpt = await $('li[data-value="nvidia-tesla-v100"]');
        GPUOpt.click();

        // Estimated cost
        await browser.pause(2000);
    
        const share = await $('button[aria-label="Open Share Estimate dialog"]');
        share.click();
        const openSum = await $('div[jsname="rZHESd"] div.v08BQe a');
        const href = await openSum.getAttribute('href');
        const tmp = href.split('/');
        const postId = tmp[tmp.length - 1];
        await browser.url(`https://cloud.google.com/products/calculator/estimate-preview/${postId}`);

        // Checking results
        const instanceNumRes = await (await $('div.wZCOB > div:nth-child(7) > span > span.Z7Pe2d.g5Ano > span.Kfvdz')).getHTML(false);
        const OS = await (await $('div.wZCOB > div:nth-child(8) > span > span.Z7Pe2d.g5Ano > span.Kfvdz')).getHTML(false);
        const provisioningModel = await (await $('div.wZCOB > div:nth-child(9) > span > span.Z7Pe2d.g5Ano > span.Kfvdz')).getHTML(false);
        const machineTypeRes = await (await $('div.wZCOB > div:nth-child(3) > span:nth-child(2) > span.Z7Pe2d.g5Ano > span.Kfvdz')).getHTML(false);
        const GPUModelRes = await (await $('div.wZCOB > div:nth-child(4) > span:nth-child(2) > span.Z7Pe2d.g5Ano > span.Kfvdz')).getHTML(false);
        const GPUNum = await (await $('div.wZCOB > div:nth-child(4) > span:nth-child(3) > span.Z7Pe2d.g5Ano > span.Kfvdz')).getHTML(false);
        const ssdRes = await (await $('div.wZCOB > div:nth-child(5) > span > span.Z7Pe2d.g5Ano > span.Kfvdz')).getHTML(false);
        const locationRes = await (await $('div.wZCOB > div:nth-child(15) > span > span.Z7Pe2d.g5Ano > span.Kfvdz')).getHTML(false);
        const commitUsageRes = await (await $('div.wZCOB > div:nth-child(16) > span > span.Z7Pe2d.g5Ano > span.Kfvdz')).getHTML(false);

        expect(instanceNumRes).toEqual('4');
        expect(OS).toEqual('Free: Debian, CentOS, CoreOS, Ubuntu or BYOL (Bring Your Own License)');
        expect(provisioningModel).toEqual('Regular');
        expect(machineTypeRes).toEqual('n1-standard-8, vCPUs: 8, RAM: 30 GB');
        expect(GPUModelRes).toEqual('NVIDIA Tesla V100');
        expect(GPUNum).toEqual('1');
        expect(ssdRes).toEqual('2x375 GB');
        expect(locationRes).toEqual('Netherlands (europe-west4)');
        expect(commitUsageRes).toEqual('1 year');
    });
})