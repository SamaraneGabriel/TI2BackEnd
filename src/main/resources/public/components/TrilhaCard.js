
export function getTrilhaCard(imgSrc, cardTitle){
    return (/*html*/`
        <div class="col">
            <div class="rounded-circle-container mx-auto">
                <a href="#">
                    <img class="rounded-circle expand-on-hover" alt="avatar1"
                        src="${imgSrc}" />
                </a>
            </div>
            <p class="trilhaTitle"><b>${cardTitle}</b></p>
        </div>
    `)
}
/*
<div class="col" id="quote3">
<div class="card mx-auto" style="width: 18rem;">
    <img src="./images/card-pgInicial/gandhi.jpeg" class="card-img-top" alt="...">
    <div class="card-body">
        <blockquote class="blockquote">
            <p>Quem sabe concentrar-se numa coisa e insistir nela como único objetivo, obtém, ao fim e
                ao cabo, a capacidade de fazer qualquer coisa</p>
        </blockquote>
        <figcaption class="blockquote-footer">
            Mahatma Gandhi<cite title="Source Title"></cite>
        </figcaption>
    </div>
</div>
</div>
*/

/*
        <div class="rounded-circle-container card-trilha">
            <a href="#">
                <img class="rounded-circle expand-on-hover" alt="avatar1"
                    src="${imgSrc}" />
            </a>
        </div>
        <p class="trilhaTitle"><b>${cardTitle}</b></p>

*/