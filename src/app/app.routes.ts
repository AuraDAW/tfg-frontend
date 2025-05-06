import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        // url vacia
        path:"",
        redirectTo:"/home",
        pathMatch:"full"
    },
    {
        // url home
        path:"home",
        loadComponent:()=>import("./components/home/home.component").then(c=>c.HomeComponent)
    },
    {
        // team manager
        path:"teamManager",
        loadComponent:()=>import("./components/team-manager/team-manager.component").then(c=>c.TeamManagerComponent)
    },
    {
<<<<<<< HEAD
        // team builder de un equipo existente (para editar)
        path:"teamBuilder/:userId/:teamId",
        loadComponent:()=>import("./components/team-builder/team-builder.component").then(c=>c.TeamBuilderComponent)
    },
    {
        // añadiendo pokemon a un equipo
        path:"pokemonFrm/:teamId",
        loadComponent:()=>import("./components/pokemon-frm/pokemon-frm.component").then(c=>c.PokemonFrmComponent)
    },
    {
        // editando 1 pokemon de un equipo
        path:"pokemonFrm/:teamId/:id",
=======
        // team builder
        path:"teamBuilder/:id",
        loadComponent:()=>import("./components/team-builder/team-builder.component").then(c=>c.TeamBuilderComponent)
    },
    {
        // pokemon individual del team builder
        path:"pokemonFrm",
        loadComponent:()=>import("./components/pokemon-frm/pokemon-frm.component").then(c=>c.PokemonFrmComponent)
    },
    {
        // editar pokemon
        path:"pokemonFrm/:id",
>>>>>>> b305fe81c8d3ca6dac897524b65c84cc5796ad4f
        loadComponent:()=>import("./components/pokemon-frm/pokemon-frm.component").then(c=>c.PokemonFrmComponent)
    },
    {
        // 404
        path:"**",
        loadComponent:()=>import("./components/c404/c404.component").then(c=>c.C404Component)
    }
];
