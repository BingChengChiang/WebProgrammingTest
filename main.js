const albumName = [
    "2021 BingCheng AstroPhoto",
    "2020 BingCheng AstroPhoto",
    "2019 BingCheng AstroPhoto",
    "2018 BingCheng AstroPhoto",
    "2017 BingCheng AstroPhoto"
    
]
const imagePathCaption = [
    [   
        ["https://i.imgur.com/wn3MKuM.jpg", "M33 Triangulum Galaxy"],
        ["https://i.imgur.com/4okjo4C.jpg", "IC 1805 Heart Nebula"],
        ["https://i.imgur.com/SrDR6sI.jpg", "Cassiopia and nearby nebulas"],
        ["https://i.imgur.com/gszNMMK.jpg", "M8 Lagoon and M20 Trifid Nebula"],
        ["https://i.imgur.com/PoovVYS.jpg", "Sagittarius and nearby nebulas"],
        ["https://i.imgur.com/CU5g4wI.jpg", "Crux and Eta Carina"],
        ["https://i.imgur.com/jrZcods.jpg", "ZhuNan Milky Way"],
        ["https://i.imgur.com/aA7hpmL.jpg", "Mt. DongPu StarTrail"],
        ["https://i.imgur.com/4zOVcDs.jpg", "Kun-Yang Milky Way"],
        ["https://i.imgur.com/uIxQX9v.jpg", "NGC 1499 California Nebula"],
        ["https://i.imgur.com/HOEaQyv.jpg", "Lunar Eclipse"],
        ["https://i.imgur.com/XrmrMKT.jpg", "Moon Halo"],
        ["https://i.imgur.com/v4D5KwG.jpg", "NGC 7000 North America Nebula"],
        ["https://i.imgur.com/a5AJKZP.jpg", "Veil Nebula"]
    ],
    [
        ["https://i.imgur.com/pTzO8C2.jpg", "Sun Prominence under Hα"],
        ["https://i.imgur.com/dM37Oim.jpg", "Moon Landscape"],
        ["https://i.imgur.com/W57z2e2.jpg", "Annular Solar Eclipse"],
        ["https://i.imgur.com/JjXYJLE.jpg", "M27 Dumbbell Nebula"],
        ["https://i.imgur.com/kjWY7lC.jpg","M57 Ring Nebula"],
        ["https://i.imgur.com/hx9nq7G.jpg", "M31 Andromeda Galaxy"],
        ["https://i.imgur.com/imwqJl2.jpg", "Cui-Feng Milky Way"],
        ["https://i.imgur.com/6Lr5CBf.jpg", "Library and Orion"],
        ["https://i.imgur.com/DiGjRIx.jpg", "Comet C/2020 F3 "]
    ],
    [
        ["https://i.imgur.com/79prw8y.jpg", "ISS and Iridium Flash"],
        ["https://i.imgur.com/I51JVdJ.jpg", "International Space Station"]
    ],
    [
        ["https://i.imgur.com/Sn9WuAN.jpg", "M42 Orion Nebula"],
        ["https://i.imgur.com/kCVkp4q.jpg", "Comet 46P"]
    ],
    [
        
    ]
]

class AlbumList{
    constructor(){
        this.currentAlbumIndex = null;
        this.albums = [];
    }
    get currentAlbum(){
        if(!this.isEmpty) return this.albums[this.currentAlbumIndex];
        else{
            return{
                totalImages: 0,
                currentImage: {imageSrc: "./images/icon/emptyempty.png", imageCaption: null, imageNumber: -1}
            }
        }
    }
    get totalImages(){
        let sum = 0;
        for(let i = 0; i < this.albums.length; i++){
            sum = sum + Number(this.albums[i].totalImages);
        }
        return sum;
    }
    get totalAlbums(){
        return this.albums.length;
    }
    get isEmpty(){
        return !Boolean(this.totalAlbums);
    }
}
class Album{
    constructor(albumName){
        this.albumName = albumName;
        this.albumImages = [];
        this.albumNumber;
        this.currentShowCaseIndex = null;
    }
    get totalImages() {
        return this.albumImages.length;
    }
    get albumCoverImage(){
        if(this.isEmpty) return {imageSrc: "./images/icon/empty.png", imageCaption: null, imageNumber: -1};
        else return this.albumImages[0];
    }
    get currentImage(){
        if(this.isEmpty) return {imageSrc: "./images/icon/empty.png", imageCaption: null, imageNumber: -1};
        else return this.albumImages[this.currentShowCaseIndex];
    }
    get isEmpty(){
        return !Boolean(this.totalImages);
    }
}
class AlbumImage{
    constructor(imageSrc, imageCaption){
        this.imageSrc = imageSrc;
        this.imageCaption = imageCaption;
        this.imageNumber;
    }
}

Node.prototype.removeAllChild = function() {
    if(this.children.length){
        this.removeChild(this.children[0]);
        this.removeAllChild();
    }
}



albumList = new AlbumList();

for(let i = 0; i < albumName.length; i++){
    albumList.albums.push(new Album(albumName[i]));
    albumList.albums[i].albumNumber = i;
    albumList.currentAlbumIndex = i;
    for(let j = 0; j < imagePathCaption[i].length; j++){
        albumList.albums[i].albumImages.push(new AlbumImage(imagePathCaption[i][j][0], imagePathCaption[i][j][1]));
        albumList.albums[i].albumImages[j].imageNumber = j;
    }
    if(! albumList.albums[i].isEmpty) albumList.albums[i].currentShowCaseIndex = 0;
}
if(! albumList.isEmpty) albumList.currentAlbumIndex = 0;




function ReLoad(){
    // album case
    let albumCase = document.getElementsByClassName("album-case")[0];
    albumCase.removeAllChild();

    let totalImages = document.createElement("div");
    totalImages.id = "total-images";
    albumCase.appendChild(totalImages);

    for(let i = 0; i < albumList.totalAlbums; i++){
        let cover = document.createElement("img");
        cover.src = albumList.albums[i].albumCoverImage.imageSrc;
        cover.id = "cover-" + i;
        cover.addEventListener("click",
            function(){
                document.getElementById("selected-album-cover").id = "cover-" + i;
                document.getElementById("cover-" + i).id = "selected-album-cover";
                albumList.currentAlbumIndex = i;
                if(albumList.currentAlbum.isEmpty) alert("Empty album.");
                ReLoad();
            }
        )

        if (i === albumList.currentAlbumIndex){
            cover.id = "selected-album-cover";
        }

        let title = document.createElement("div");
        title.id = "title-" + i;
        title.textContent = albumList.albums[i].albumName;
        
        let album = document.createElement("div");
        album.appendChild(cover);
        album.appendChild(title);
        albumCase.appendChild(album);
    }

    let inputAlbumTitle = document.createElement("input");
    inputAlbumTitle.placeholder = "Input Album Title";
    inputAlbumTitle.id = "input-album-title";

    let createAlbum = document.createElement("button");
    createAlbum.id = "title-submit-button";
    createAlbum.textContent = "create";
    createAlbum.onclick = function(){
        newAlbum = new Album(inputAlbumTitle.value);
        newAlbum.albumNumber = albumList.totalAlbums;
        albumList.albums.push(newAlbum);
        albumList.currentAlbumIndex = newAlbum.albumNumber;
        ReLoad();
    }
    
    let albumInputWrap = document.createElement("div");
    albumCase.appendChild(albumInputWrap);
    albumInputWrap.appendChild(inputAlbumTitle);
    albumInputWrap.appendChild(createAlbum);
    totalImages.textContent = `Total: ${albumList.totalImages} images`;

    // thumbnail case
    let currentThumbnailCase = document.getElementsByClassName("thumbnail-case")[0];
    currentThumbnailCase.removeAllChild();
    if(!albumList.isEmpty){
        for(let i = 0; i < albumList.currentAlbum.totalImages; i++){
            let thumbnail = document.createElement("img");
            thumbnail.src = albumList.currentAlbum.albumImages[i].imageSrc;
            thumbnail.id = "thumbnail-" + i;
            thumbnail.addEventListener("click",
                function(){
                    document.getElementById("selected-thumbnail").id = "thumbnail-" + i;
                    document.getElementById("thumbnail-"+i).id = "selected-thumbnail";
                    albumList.currentAlbum.currentShowCaseIndex = i;
                    ReLoad();
                }
            )
            if (i === albumList.currentAlbum.currentImage.imageNumber){
                thumbnail.id = "selected-thumbnail";
            }
            currentThumbnailCase.appendChild(thumbnail);
        }
    }
    let inputCaption = document.createElement("input");
    inputCaption.placeholder = "Input Caption";
    inputCaption.id = "input-caption";
    
    let inputURL = document.createElement("input");
    inputURL.placeholder = "Input URL";
    inputURL.id = "input-src";

    let submit = document.createElement("button");
    submit.id = "thumbnail-submit-button";
    submit.textContent = "submit";
    submit.onclick = function(){
        if(!albumList.isEmpty){
            let newImage = new AlbumImage(inputURL.value, inputCaption.value);
            newImage.imageNumber = albumList.currentAlbum.totalImages;
            albumList.currentAlbum.albumImages.push(newImage);
            albumList.currentAlbum.currentShowCaseIndex = newImage.imageNumber;
            ReLoad();
        }
        else{
            alert("Create an album before adding images.")
        }
    }

    let imageInputWrap = document.createElement("div");
    currentThumbnailCase.appendChild(imageInputWrap);
    imageInputWrap.appendChild(inputCaption);
    imageInputWrap.appendChild(inputURL);
    imageInputWrap.appendChild(submit);


    // show case
    let currentShowCase = document.getElementsByClassName("show-case")[0];
    currentShowCase.removeAllChild();

    let showcase = document.createElement("img");
    showcase.src = albumList.currentAlbum.currentImage.imageSrc;    
    currentShowCase.appendChild(showcase);


    // caption case
    let caption = document.getElementById("caption");
    caption.textContent = albumList.currentAlbum.currentImage.imageCaption;
    let number = document.getElementById("number");
    number.textContent = `${albumList.currentAlbum.currentImage.imageNumber + 1} of ${albumList.currentAlbum.totalImages}`;
    
    let nextbutton = document.getElementById("nextbutton");
    nextbutton.onclick = function(){
        let nextNum = (albumList.currentAlbum.currentShowCaseIndex + 1) % (albumList.currentAlbum.totalImages);
        albumList.currentAlbum.currentShowCaseIndex = nextNum;
        ReLoad();
    }

    let backbutton = document.getElementById("backbutton");
    backbutton.onclick = function(){
        let backNum = (albumList.currentAlbum.currentShowCaseIndex + albumList.currentAlbum.totalImages-1) % (albumList.currentAlbum.totalImages);
        albumList.currentAlbum.currentShowCaseIndex = backNum;
        ReLoad();
    }

    let deleteimagebutton = document.getElementById("deleteimagebutton");
    deleteimagebutton.onclick = function(){
        if(albumList.isEmpty || albumList.currentAlbum.isEmpty){
            alert("No photos here. Delete your delete.");
        }
        else{
            let deleteIt = confirm("Delete the image?");
            if(deleteIt){
                let indexToDelete = albumList.currentAlbum.currentShowCaseIndex;
                albumList.currentAlbum.albumImages.splice(indexToDelete, 1);
                for(let i = indexToDelete+1 ; i < albumList.currentAlbum.totalImages+1; i++){
                    albumList.currentAlbum.albumImages[i-1].imageNumber = i-1;
                }
                albumList.currentAlbum.currentShowCaseIndex = 0;
                ReLoad();
            }
        }
    }

    // title case
    let currentAlbumName = document.getElementById("album-name");
    currentAlbumName.textContent = albumList.currentAlbum.albumName;
    
    let editTitleIcon = document.getElementById("edit-title");
    editTitleIcon.onclick = function(){
        if(albumList.isEmpty){
            alert("No album here. Edit title, uh uh.")
        }
        else{
            let input = document.createElement("input");
            input.placeholder="Input Title"
            currentAlbumName.textContent = "";
            currentAlbumName.appendChild(input);
            
            let submit = document.createElement("button");
            submit.id = "title-submit-button";
            submit.textContent = "submit";
            currentAlbumName.appendChild(submit);
        
            submit.onclick = function(){
                albumList.currentAlbum.albumName = input.value;
                let name = document.getElementById("title-" + albumList.currentAlbumIndex);
                name.textContent = albumList.albums[albumList.currentAlbumIndex].albumName;
                ReLoad();
            }
        }
    }

    let deleteAlbumButton = document.getElementById("delete-album");
    deleteAlbumButton.onclick = function(){
        if(albumList.isEmpty){
            alert("No albums here. Delete your delete.")   
        }
        else{
            let deleteIt = confirm("Delete the album?");
            if(deleteIt){
                let indexToDelete = albumList.currentAlbumIndex;
                albumList.albums.splice(albumList.currentAlbumIndex,1);
                for(let i = indexToDelete+1 ; i < albumList.totalAlbums+1; i++){
                    albumList.albums[i-1].albumNumber = i-1;
                }
                albumList.currentAlbumIndex = 0;
                ReLoad();
            }
        }
    }

}


ReLoad();