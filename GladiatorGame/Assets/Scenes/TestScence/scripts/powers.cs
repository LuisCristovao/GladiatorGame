using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class powers : MonoBehaviour
{
    public GameObject x;
    private double time;
    // Start is called before the first frame update
    void Start()
    {
        time = 0;
    }

    // Update is called once per frame
    void Update()
    {
        time += Time.deltaTime;
    }
}
