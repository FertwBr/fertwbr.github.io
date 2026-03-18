// src/locales/shared/es.js
/**
 * Cadenas de localización compartidas principales.
 * Incluye elementos comunes de la interfaz de usuario, estados de error, formularios y páginas de visualización universales.
 */
export default {
    common: {
        offline: "Actualmente está sin conexión."
    },
    redirect: {
        launching: "Iniciando la aplicación...",
        did_open: "¿Se abrió la aplicación?",
        open_again: "Abrir la aplicación nuevamente",
        get_on_store: "Obtener en Google Play"
    },
    error: {
        title: "Fallo del sistema",
        desc_1: "Ocurrió un error inesperado en el núcleo de la aplicación.",
        desc_2: "No se preocupe, no se ha perdido ningún dato.",
        reload: "Recargar el sistema",
        home: "Volver al inicio",
        show_details: "Mostrar detalles técnicos",
        hide_details: "Ocultar detalles técnicos",
        copy: "Copiar",
        copied: "Copiado"
    },
    footer: {
        rights: "Todos los derechos reservados.",
        built: "Diseñado y desarrollado por Fernando Vaz 🇧🇷",
        useful_links: "Enlaces útiles",
        social_title: "Conectar",
        appearance: {
            title: "Tema y apariencia",
            language_selector: "Idioma",
            en: "English",
            pt: "Português",
            theme_mode: "Modo",
            mode_auto: "Automático",
            mode_light: "Claro",
            mode_dark: "Oscuro"
        },
        themes: {
            "m3 purple": "Morado M3",
            "crimson": "Carmesí",
            "teal": "Verde azulado",
            "forest": "Bosque",
            "emerald": "Esmeralda",
            "amber": "Ámbar",
            "coral": "Coral",
            "rose": "Rosa",
            "magenta": "Magenta"
        }
    },
    terms_page: {
        page_title: "Términos de Uso",
        last_updated: "Última actualización:",
        print_btn: "Imprimir los términos",
        table_of_contents: "Índice",
        contact_title: "¿Preguntas sobre estos Términos?",
        contact_desc: "Si tiene alguna pregunta o inquietud con respecto a estos Términos de Uso, comuníquese con nuestro equipo de soporte.",
        contact_btn: "Contactar al soporte"
    },
    privacy_page: {
        page_title: "Política de Privacidad",
        last_updated: "Última actualización:",
        table_of_contents: "Índice",
        contact_title: "¿Tiene preguntas?",
        contact_desc: "Si tiene alguna inquietud sobre sus datos, comuníquese con nosotros.",
        contact_btn: "Contactar al soporte",
        print_btn: "Imprimir la política"
    },
    help_page: {
        page_title: "Ayuda y Preguntas Frecuentes",
        subtitle: "Encuentre respuestas y aprenda a aprovechar al máximo la aplicación.",
        search_placeholder: "Buscar respuestas...",
        table_of_contents: "Temas",
        contact_title: "¿Sigue atascado?",
        contact_desc: "¿No encuentra lo que busca? Nuestro equipo está aquí para ayudar.",
        contact_btn: "Contactar al soporte",
        no_results: "No se encontraron temas que coincidan con su búsqueda."
    },
    roadmap_page: {
        title: "Hoja de Ruta del Producto",
        subtitle: "Vea lo que hemos desarrollado y hacia dónde nos dirigimos.",
        suggest_btn: "Sugerir una función",
        contact_title: "¿Tiene una solicitud de función?",
        contact_desc: "Ayúdenos a dar forma al futuro compartiendo sus ideas directamente con el desarrollador.",
        toc_title: "Línea de tiempo"
    },
    overview_page: {
        title: "Descripción Técnica General",
        subtitle: "Una inmersión profunda en la arquitectura y la tecnología.",
        github_btn: "Ver en GitHub",
        toc_title: "En esta página",
        dynamic_docs_note: "Esta descripción general se genera dinámicamente a partir de archivos Markdown para garantizar que siempre esté actualizada con los últimos cambios en el código fuente.",
        about_docs_title: "Acerca de esta documentación"
    },
    changelog: {
        title: "Historial de Versiones",
        subtitle: "Siga la evolución de la aplicación. Aquí encontrará un registro detallado de nuevas funciones, mejoras y correcciones.",
        search_placeholder: "Buscar funciones, versiones...",
        latest_release: "Último lanzamiento",
        released: "Lanzado",
        update_now: "Actualizar ahora",
        on_this_page: "En esta página",
        read_more: "Leer notas de la versión",
        collapse: "Contraer",
        back_to_top: "Volver arriba",
        update_details: "Detalles de la actualización",
        view_all: "Ver todas las actualizaciones",
        share_update: "Compartir la actualización",
        jump_to: "Ir a",
        version_not_found: "Versión no encontrada.",
        no_results: "No se encontraron resultados.",
        back_to_changelog: "Volver al registro de cambios",
        load_more: "Cargar más",
        explore_more: "Explorar más",
        link_copied: "¡Enlace copiado al portapapeles!",
        open_full_screen: "Abrir en pantalla completa",
        share_tooltip: "Compartir esta actualización",
        previous_update: "Actualización anterior",
        next_update: "Próxima actualización",
        table_of_contents: "Índice",
        in_this_update: "En esta actualización",
        auto_translated_badge: "Traducción Automática",
        auto_translated_tooltip: "Traducido por un sistema de inteligencia artificial para su conveniencia.",
        translate_badge_restore: "Traducir",
        translate_badge_restore_tooltip: "Traducir el contenido a su idioma actual.",
        translate_modal_title: "Traducción Automática",
        translate_modal_desc: "Este contenido fue traducido automáticamente por un sistema de inteligencia artificial. Algunos términos técnicos podrían ser ligeramente imprecisos.",
        translate_modal_show_original: "Mostrar original (Inglés)",
        translate_modal_keep_translation: "Mantener la traducción"
    },
    feedback: {
        title: "Enviar Comentarios",
        subtitle: "Ayúdenos a mejorar. Informes de errores, solicitudes de funciones o simplemente para saludar.",
        form: {
            project_label: "Proyecto",
            type_label: "Tema",
            platform_label: "Plataforma",
            email_label: "Dirección de e-mail",
            email_placeholder: "su@email.com",
            email_error: "Por favor, introduzca una dirección de e-mail válida.",
            description_label: "Mensaje",
            description_placeholder: "Describa lo que sucedió o comparta su idea...",
            description_error: "El mensaje debe tener al menos 15 caracteres.",
            include_device_info: "Incluir información del dispositivo (Navegador/Sistema Operativo)",
            send_button: "Enviar Comentarios",
            draft_recovered: "Borrador recuperado",
            discard_draft: "Descartar borrador"
        },
        success: {
            title: "¡Mensaje Enviado!",
            message: "Su mensaje se envió con éxito a support@fertwbr.com. Se ha enviado una copia de confirmación a {email}.",
            error_title: "Error en la entrega",
            error_message: "Encontramos un error de red al intentar enviar su mensaje. Por favor, inténtelo de nuevo.",
            btn_retry: "Intentar de nuevo",
            btn_edit: "Editar mensaje",
            btn_home: "Volver al inicio"
        },
        projects: {
            pixelpulse: "Pixel Pulse",
            pixelcompass: "Pixel Compass",
            portfolio: "Sitio del Portafolio"
        },
        platforms: {
            android: "Android (Teléfono)",
            wearos: "Wear OS",
            web: "Web / Sitio"
        },
        types: {
            general: "Comentarios Generales",
            bug: "Informe de Error",
            feature: "Solicitud de Función",
            translation: "Problema de Traducción",
            ui: "Sugerencia de Interfaz",
            other: "Otro"
        },
        guidance: {
            label: "Consejo",
            default_general: "¡Estamos escuchando! Comparta sus pensamientos.",
            default_bug: "Describa los pasos para que ocurra el error.",
            default_feature: "¿Cómo mejoraría su experiencia esta función?",
            default_translation: "¿Qué pantalla tiene el texto incorrecto?",
            short_text: "Por favor, proporcione un poco más de detalles para que podamos entender mejor.",
            crash: "Si la aplicación se cerró inesperadamente, ¿vio un código o mensaje de error?",
            screenshot: "Una imagen vale más que mil palabras. Considere adjuntar una captura de pantalla.",
            translation_keyword: "Mencionar el idioma específico y la frase incorrecta nos ayuda a solucionarlo rápidamente.",
            steps_received: "¡Perfecto! Conocer los pasos nos ayuda a reproducir el problema.",
            error_received: "Gracias por incluir los detalles del error.",
            location_received: "Excelente, saber la ubicación de la pantalla es muy útil.",
            idea_received: "¡Esa es una idea interesante! Cuéntenos más sobre cómo funcionaría.",
            great_detail: "¡Grandes detalles! Esto nos ayuda a comprender significativamente."
        },
        keywords: {
            crash: "bloqueo,cerrar,parar,apagar,congelar,retraso,roto,pantalla blanca",
            error: "error,código,fallo,excepción,0x,número,mensaje",
            steps: "paso,primero,entonces,después,cuando,hacer clic,tocar,presionar,desplazar",
            screen: "pantalla,página,vista,ventana,diálogo,pestaña,tarjeta,menú,barra de navegación,pie de página",
            correction: "texto,palabra,error tipográfico,incorrecto,malo,ortografía,gramática,traducir,idioma",
            idea: "añadir,crear,deseo,haría,podría,debería,mejor,nuevo,función,modo"
        }
    }
};