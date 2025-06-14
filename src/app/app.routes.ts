import { Routes } from '@angular/router';
import { authGuard } from './services/guard/auth.guard';

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
        loadComponent:()=>import("./components/team-manager/team-manager.component").then(c=>c.TeamManagerComponent),
        canActivate:[authGuard]
    },
    {
        // team builder de un equipo existente (para editar)
        path:"teamBuilder/:userId/:teamId",
        loadComponent:()=>import("./components/team-builder/team-builder.component").then(c=>c.TeamBuilderComponent),
        canActivate:[authGuard]
    },
    {
        // team viewer de un equipo existente (para ver)
        path:"teamViewer/:teamId",
        loadComponent:()=>import("./components/team-viewer/team-viewer.component").then(c=>c.TeamViewerComponent),
        canActivate:[authGuard]
    },
    {
        // añadiendo pokemon a un equipo
        path:"pokemonFrm/:teamId",
        loadComponent:()=>import("./components/pokemon-frm/pokemon-frm.component").then(c=>c.PokemonFrmComponent),
        canActivate:[authGuard]
    },
    {
        // editando 1 pokemon de un equipo
        path:"pokemonFrm/:teamId/:id",
        loadComponent:()=>import("./components/pokemon-frm/pokemon-frm.component").then(c=>c.PokemonFrmComponent),
        canActivate:[authGuard]
    },
    {
        // login
        path:"login",
        loadComponent:()=>import("./components/login/login.component").then(c=>c.LoginComponent)
    },
    {
        // register
        path:"register",
        loadComponent:()=>import("./components/register/register.component").then(c=>c.RegisterComponent)
    },
    {
        // admin panel
        path:"adminPanel",
        loadComponent:()=>import("./components/adminpanel/adminpanel.component").then(c=>c.AdminpanelComponent),
        canActivate:[authGuard]
    },
    {
        // create new pokemonData
        path:"adminPokemon",
        loadComponent:()=>import("./components/admin-pokemon/admin-pokemon.component").then(c=>c.AdminPokemonComponent),
        canActivate:[authGuard]
    },
    {
        // edit existing pokemonData
        path:"adminPokemon/:id",
        loadComponent:()=>import("./components/admin-pokemon/admin-pokemon.component").then(c=>c.AdminPokemonComponent),
        canActivate:[authGuard]
    },
    {
        // create new move
        path:"adminMoves",
        loadComponent:()=>import("./components/admin-move/admin-move.component").then(c=>c.AdminMoveComponent),
        canActivate:[authGuard]
    },
    {
        // edit existing move
        path:"adminMoves/:id",
        loadComponent:()=>import("./components/admin-move/admin-move.component").then(c=>c.AdminMoveComponent),
        canActivate:[authGuard]
    },
    {
        // create new item
        path:"adminItems",
        loadComponent:()=>import("./components/admin-item/admin-item.component").then(c=>c.AdminItemComponent),
        canActivate:[authGuard]
    },
    {
        // edit existing item
        path:"adminItems/:id",
        loadComponent:()=>import("./components/admin-item/admin-item.component").then(c=>c.AdminItemComponent),
        canActivate:[authGuard]
    },
    {
        // create new ability
        path:"adminAbilities",
        loadComponent:()=>import("./components/admin-ability/admin-ability.component").then(c=>c.AdminAbilityComponent),
        canActivate:[authGuard]
    },
    {
        // edit existing ability
        path:"adminAbilities/:id",
        loadComponent:()=>import("./components/admin-ability/admin-ability.component").then(c=>c.AdminAbilityComponent),
        canActivate:[authGuard]
    },
    {
        // add possible abilities and moves to a pokemon
        path:"adminAbilitiesMovesPokemon",
        loadComponent:()=>import("./components/add-abilities-moves-pokemon/add-abilities-moves-pokemon.component").then(c=>c.AddAbilitiesMovesPokemonComponent),
        canActivate:[authGuard]
    },
    {
        // 404
        path:"**",
        loadComponent:()=>import("./components/c404/c404.component").then(c=>c.C404Component)
    }
];
