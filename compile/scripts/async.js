function Fn(bool) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (bool) resolve(bool)
            else reject(bool)
        }, 1000)
    })
}

let asyncFn = async function () {
    await Fn(1)
    await Fn(0)
}

asyncFn()