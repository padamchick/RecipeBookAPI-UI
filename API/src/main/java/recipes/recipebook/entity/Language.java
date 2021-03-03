package recipes.recipebook.entity;

import lombok.Getter;

public enum Language {
    POLISH("pl"),
    ENGLISH("en");

    @Getter
    private String lang;

    Language(String lang) {
        this.lang = lang;
    }

    public static String getLang(Language language) {
        return language.lang;
    }

    public static Language valueOfLang(String label) {
        for (Language e : values()) {
            if (e.lang.equals(label)) {
                return e;
            }
        }
        return null;
    }


}
