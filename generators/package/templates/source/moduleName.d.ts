
declare module drupal {

    export module Core {

        export interface IBehaviors {

            tokenTree: Core.IBehavior;

            tokenInsert: Core.IBehavior;

        }

    }

    export interface IDrupalSettings {

        tokenFocusedField?: HTMLTextAreaElement | HTMLInputElement;

    }

}
