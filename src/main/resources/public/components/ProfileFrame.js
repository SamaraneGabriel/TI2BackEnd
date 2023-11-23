/* Outer scope of profile. Things such as name, sidebar, etc 
 * All profile state (sobre mim, plano, ...) contains this exact frame and their own child.
 * This component was created to merge the common outer area with the unique children of each of the states
 */

export function generateProfileFrame(child) { 
return(/*html*/`
        <div class="main-view mt-5">
            <!--
                Spacing from elements inside box with container and mt-5.
            -->
            <div class="profileField row">
                <div class="col-3">
                    <!--
                        Left and unchanging part of the profile view.
                        Holds profile picture and nav
                    -->
                    <div class="rounded-circle-container profilePicture">
                        <a href="#">
                            <img alt="avatar1" src="/images/card-pgPrincipal/perfil.png">
                        </a>
                    </div>

                    <div class="mt-5"></div> <!--vertical divider-->

                    <div class="sidebar">
                        <h3 class="">Nome Sobrenome</h3>
                        <p class="streak"><b>6</b> <i class="fas fa-fire"></i> </p>

                        <div class="mt-5"></div> <!--vertical divider-->
                        <nav id="nav"> <!--navigation section-->
                            <h5 class="clickable pageOff">Informacoes gerais</h5>
                            <h5 class="clickable pageOff">Sobre mim</h5>
                            <h5 class="clickable pageOff">Plano</h5>
                            <div class="mt-5"></div> <!--lazy adjustment to make box bigger-->
                        </nav>
                    </nav>
                    </div>
                </div>

                <div class="col-2"></div> <!--lazy horizontal divider-->
                ${child}
            </div>
        </div>
`);
}