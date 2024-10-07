const parseEnv = () => {
    const envVars = process.env;

    const rssVars = Object.entries(envVars)
        .filter(([key]) => key.startsWith('RSS_'))
        .map(([key, value]) => `${key}=${value}`);

    if (rssVars.length === 0) {
        console.log('No found');
        return;
    }

    const output = rssVars.join('; ');

    console.log(output);
};

parseEnv();
