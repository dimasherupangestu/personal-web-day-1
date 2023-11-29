// ambil data form
const dataBlog = []

function submitBlog(event) {
    event.preventDefault()

    let inputTitle = document.getElementById("inputTitle").value
    let inputContent = document.getElementById("inputContent").value
    let inputImage = document.getElementById("inputImage").files

    console.log("title", inputTitle)
    console.log("content", inputContent)

    inputImage = URL.createObjectURL(inputImage[0])
    console.log("image", inputImage)

    const blog = {
        title: inputTitle,
        content: inputContent,
        image: inputImage,
        postAt: new Date(),
        pengarang: "Dimas Heru",
        
    }

    dataBlog.push(blog)
    console.log("dataBlog", dataBlog)
    renderBlog()
}

function renderBlog() {
    document.getElementById("contents").innerHTML = ''
    for (let index = 0; index < dataBlog.length; index++) {
        document.getElementById("contents").innerHTML += ``
    
    }
}