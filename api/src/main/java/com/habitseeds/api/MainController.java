package com.habitseeds.api;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MainController {

    @GetMapping("/")
    public String index() {
        return "Welcome to Habit Seeds";
    }

    @GetMapping("/goodmorning")
    public ResponseEntity<?> checkForSurveyResponseToday(@RequestParam String UUID) {
        System.out.println("/goodmorning");
        System.out.println("userid: " + UUID);
        // user has completed survey already today
        String resp_completed = "{\"complete\":true}";
        // user has not completed survey today already
        String resp_incomplete = "{\"complete\":false, \"questions\": [\n" +
//                "      {\n" +
//                "        \"question\": \"Make your bed?\",\n" +
//                "        \"extra_questions\": []\n" +
//                "      },\n" +
//                "      {\n" +
//                "        \"question\": \"Drink a cup of water?\",\n" +
//                "        \"extra_questions\": []\n" +
//                "      },\n" +
//                "      {\n" +
//                "        \"question\": \"Meditate for 1 minute?\",\n" +
//                "        \"extra_questions\": []\n" +
//                "      },\n" +
//                "      {\n" +
//                "        \"question\": \"Brush your teeth?\",\n" +
//                "        \"extra_questions\": []\n" +
//                "      },\n" +
//                "      {\n" +
//                "        \"question\": \"Go to the gym?\",\n" +
//                "        \"extra_questions\": []\n" +
//                "      },\n" +
//                "      {\n" +
//                "        \"question\": \"Go to the gym?\",\n" +
//                "        \"extra_questions\": []\n" +
//                "      },\n" +
//                "      {\n" +
//                "        \"question\": \"Shower?\",\n" +
//                "        \"extra_questions\": []\n" +
//                "      },\n" +
//                "      {\n" +
//                "        \"question\": \"Eat breakfast?\",\n" +
//                "        \"extra_questions\": []\n" +
//                "      },\n" +
//                "      {\n" +
//                "        \"question\": \"Take a fish oil supplement?\",\n" +
//                "        \"extra_questions\": []\n" +
//                "      },\n" +
                "      {\n" +
                "        \"question\": \"Take an L-Theanine supplement?\",\n" +
                "        \"extra_questions\": []\n" +
                "      }\n" +
                "    ]}";
        return new ResponseEntity<String>(resp_incomplete, HttpStatus.OK);
    }
}
