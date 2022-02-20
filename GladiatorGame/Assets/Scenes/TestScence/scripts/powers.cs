using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class powers : MonoBehaviour
{
    public GameObject x;
    private time=0;
    public object Time { get; private set; }
    // Start is called before the first frame update
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        time += Time.deltaTime;
    }
}
