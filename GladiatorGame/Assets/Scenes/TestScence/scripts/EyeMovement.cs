using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class EyeMovement : MonoBehaviour
{
    Transform eye;
    float max_scale;
    double time;
    bool invert;

    public float speed = 0.02f;
    public float duration = 2;
    public float closed_eye_duration = 0.1f;

    public object Time { get; private set; }

    // Use this for initialization
    void Start()
    {
        invert = false;
        eye = GetComponent<Transform>();
        max_scale = eye.localScale.y;
        time = 0;
    }

    // Update is called once per frame
    void Update()
    {
        time += Time.deltaTime;
        //print(eye.localScale);
        if (time > duration)
        {
            time = 0;
            invert = !invert;
        }
        else
        {
            if (!invert && time < (duration * closed_eye_duration))
            {
                if (eye.localScale.y > 0)
                {
                    eye.localScale = new Vector2(eye.localScale.x, eye.localScale.y - speed * 2);
                }

            }
            else
            {
                if (eye.localScale.y < max_scale)
                {
                    eye.localScale = new Vector2(eye.localScale.x, eye.localScale.y + speed);
                }
                else
                {
                    eye.localScale = new Vector2(eye.localScale.x, max_scale);
                }
            }

        }

    }
}