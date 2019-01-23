const ADDR = 'http://127.0.0.1:5000'
var leftStat = false
var rightStat = false

window.onload = function () {
  const TOPTIP = document.getElementById('top-tip')
  fetch(ADDR + '/init', {
    method: 'GET'
  })
  .then(response => {
    return response.text()
  })
  .then(text => {
    TOPTIP.innerHTML = text
  })
  .catch(error => {
    console.log(`Init failed: ${error}`)
  })
}

function postImage () {
  const FORMDATA = new FormData()
  const LEFTFILE = document.getElementById('file-left')
  const RIGHTFILE = document.getElementById('file-right')
  const RESULTAREA = document.getElementById('result-area')
  FORMDATA.append('left', LEFTFILE.files[0])
  FORMDATA.append('right', RIGHTFILE.files[0])
  fetch(ADDR + '/api/stitch', {
    method: 'POST',
    body: FORMDATA
  })
  .then(response => {
    return response.text()
  })
  .then(text => {
    RESULTAREA.innerHTML = '<img class="img-thumbnail animated fadeInUpBig" src="data:image/jpeg;base64,' + text + '" />'
  })
  .catch(error => console.log(`Uplpad failed: ${error}`))
}

function showPreviewLeft (element) {
  const LEFTPREVIEW = document.getElementById('preview-left')
  const FILEREADER = new FileReader()
  if (element.files[0]) {
    FILEREADER.onload = () => {
      LEFTPREVIEW.innerHTML = '<img class="img-thumbnail animated fadeIn" src="' + FILEREADER.result + '" />'
    }
    FILEREADER.readAsDataURL(element.files[0])
    leftStat = true
  }

  if (leftStat && rightStat) {
    const UPLOADBUTTON = document.getElementById('upload-button')
    UPLOADBUTTON.style.display = 'block'
  }
}

function showPreviewRight (element) {
  const RIGHTPREVIEW = document.getElementById('preview-right')
  const FILEREADER = new FileReader()
  if (element.files[0]) {
    FILEREADER.onload = () => {
      RIGHTPREVIEW.innerHTML = '<img class="img-thumbnail animated fadeIn" src="' + FILEREADER.result + '" />'
    }
    FILEREADER.readAsDataURL(element.files[0])
    rightStat = true
  }

  if (leftStat && rightStat) {
    const UPLOADBUTTON = document.getElementById('upload-button')
    UPLOADBUTTON.style.display = 'block'
  }
}
