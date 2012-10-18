function(doc) {
  if (doc._id.substr(0,6)==="lyric:"){
    emit(doc._id.substr(6),{
    "category": doc.category,
   	"date": doc.date,
   	"explicit":doc.explicit,
   	"rate":doc.rate,
   	"lyrics": doc.lyrics"
    });
  }
};