class LibSettings {

    setSettings(data) {
        const settingDom = document.createElement('mygtk-msal-settings');
        document.body.appendChild(settingDom);
        console.log({setSettings: data})
        settingDom.dummySt = 'hoge';
        settingDom.msalSettings = data;
        //const item = document.querySelector('mygtk-msal-settings')
        //document.body.removeChild(item);
    }
}